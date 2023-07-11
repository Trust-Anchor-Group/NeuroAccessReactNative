import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { CameraSwitch } from '@Assets/Svgs/CameraSwitch';
import { ThemeContext } from '@Theme/Provider';
import { TextLabel } from '@Controls/TextLabel';
import { TextLabelVariants } from '@Controls/TextLabel';
import Gallery from '@Assets/Svgs/Gallery';
import { Manually } from '@Assets/Svgs/Manually';
import { FlashLight } from '@Assets/Svgs/FlashLight';
import { ServiceProvider } from '@Assets/Svgs/ServiceProvider';
import { ScannerBackButton } from '@Assets/Svgs/ScannerBackButton';
import { ScannerBlurBg } from '@Assets/Svgs/ScannerBlurBg';
import { DomainInfo } from '@Services/Redux/Reducers/DomainSlice';
import { QRCodeScannerStyle as styles } from './QRCodeScannerStyle';
import { useTranslation } from 'react-i18next';
interface Props {
  toggleOverlay: () => void;
  onSelect: (qrcode: DomainInfo) => void;
}
export const QRCodeScanner: React.FC<Props> = (props: Props) => {
  const { toggleOverlay, onSelect } = props;
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);

  const [isBackCamera, setBackCamera] = useState(true);
  const [isTourchEnable, setTourchEnable] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isError, setError] = React.useState(false);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const camera = React.useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = isBackCamera ? devices.back : devices.front;

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {}, [camera]);

  React.useEffect(() => {
    (async () => {
      handleGetQRCode();
    })();
  }, [barcodes]);

  const handleGetQRCode = () => {
    if (barcodes) {
      const str = barcodes[1]?.content?.data?.toString();
      const parts = str?.split(':');

      if (parts?.length === 5) {
        const domainDetails: DomainInfo = {
          Domain: parts[1],
          Key: parts[2],
          Secret: parts[3],
        };
        onSelect(domainDetails);
        toggleOverlay();
        setError(false);
      } else if (parts?.length > 0) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };
  return (
    device != null &&
    hasPermission && (
      <View style={{ flex: 1 }}>
        <Camera
          style={styles(themeColors).camera}
          ref={camera}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
          torch={isTourchEnable ? 'on' : 'off'}
        />
        <ScannerBlurBg style={styles(themeColors).blurView} bgColor={themeColors.scanner.blurBg} scanAreaCornerBg={themeColors.scanner.cornerColor}/>
        <TextLabel
          style={styles(themeColors).scannerTitle}
          variant={TextLabelVariants.HEADER}
        >
          {t('qrCodeScanner.invitaionTitle')}
        </TextLabel>
        <ScannerBackButton
          style={styles(themeColors).backButton}
          onPress={toggleOverlay}
          bgColor={themeColors.scanner.cameraBtnBg}
          iconColor={themeColors.scanner.cameraButtons}
        />
        <View style={styles(themeColors).scannerActions}>
          <ServiceProvider
            style={{ margin: 5 }}
            enabled={barcodes.length > 0}
            onPress={() => handleGetQRCode()}
            iconColor={themeColors.scanner.cameraBtnBg}
            bgColor={
              isError
                ? themeColors.scanner.providerBtnError
                : themeColors.scanner.providerBtn
            }
          />
          <TextLabel
            style={styles(themeColors).aboutQRButton}
            variant={TextLabelVariants.DESCRIPTION}
          >
            {t('qrCodeScanner.serviceProviderBtn')}
          </TextLabel>
          <View style={styles(themeColors).cameraActivity}>
            <CameraSwitch
              style={styles(themeColors).cameraActivityBtnSpace}
              onPress={() => setBackCamera(!isBackCamera)}
              bgColor={themeColors.scanner.cameraBtnBg}
              iconColor={themeColors.scanner.cameraButtons}
            />
            <Gallery
              style={styles(themeColors).cameraActivityBtnSpace}
              bgColor={themeColors.scanner.cameraBtnBg}
              iconColor={themeColors.scanner.cameraButtons}
            />
            <FlashLight
              bgColor={themeColors.scanner.cameraBtnBg}
              iconColor={themeColors.scanner.cameraButtons}
              style={styles(themeColors).cameraActivityBtnSpace}
              onPress={() => setTourchEnable(!isTourchEnable)}
            />
          </View>
          <Manually
            bgColor={themeColors.scanner.cameraBtnBg}
            iconColor={themeColors.scanner.cameraButtons}
          />
        </View>
      </View>
    )
  );
};
