import React, { useCallback, useContext, useState } from 'react';
import { Dimensions, Keyboard, View } from 'react-native';
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
import { ScannerPeerButton } from '@Assets/Svgs';
import { ScannerBlurBg } from '@Assets/Svgs/ScannerBlurBg';
import { DomainInfo } from '@Services/Redux/Reducers/DomainSlice';
import { QRCodeScannerStyle as styles } from './QRCodeScannerStyle';
import { useTranslation } from 'react-i18next';
import BottomSheet, { BottomSheetRefProps } from '@Controls/BottomSheet';
import { EnterMobileNumberStyle } from '@Pages/Styles';
import { ActionButton, InputBox } from '@Controls/index';
import { TextInputRef } from '@Controls/InputBox';
import Space from '@Controls/Space';

const height = Dimensions.get('window').height;
interface Props {
  scannerType: string;
  peerResult?: (result: any) => void;
  toggleOverlay: () => void;
  onSelect?: (qrcode: DomainInfo) => void;
}
export const QRCodeScanner: React.FC<Props> = (props: Props) => {
  const { toggleOverlay, onSelect, scannerType, peerResult } = props;
  const { t } = useTranslation();
  const ref = React.useRef<BottomSheetRefProps>(null);
  const { themeColors } = useContext(ThemeContext);

  const [isBackCamera, setBackCamera] = useState(true);
  const [isTourchEnable, setTourchEnable] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isError, setError] = React.useState(false);
  const [enterManually, setEnterManually] = React.useState(false);
  const userNameInputRef = React.useRef<TextInputRef>(null);
  const [obInfo, setObInfo] = useState('');

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const camera = React.useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = isBackCamera ? devices.back : devices.front;

  const openBottomSheet = useCallback(() => {
    setObInfo('');
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-((height * 2) / 3));
    }
  }, []);

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

  const getDomainDetailsFromObinfoString = (obInfo: string) => {
    const parts = obInfo?.split(':');

    if (parts?.length === 5) {
      const domainDetails: DomainInfo = {
        Domain: parts[1],
        Key: parts[2],
        Secret: parts[3],
      };
      return domainDetails;
    } else {
      return undefined;
    }
  };
  const handleGetQRCode = () => {
    if (barcodes) {
      if (scannerType === 'reviewRequest' && barcodes.length!==0) {
        peerResult(barcodes);
        toggleOverlay();
        setError(false);
      } else {
        const str = barcodes[1]?.content?.data?.toString();
        const domainDetails = getDomainDetailsFromObinfoString(str);
        if (domainDetails) {
          onSelect(domainDetails);
          toggleOverlay();
          setError(false);
        } else {
          setError(false);
        }
      }
    }
  };

  const handleSubmitManually = () => {
    openBottomSheet();
    const domainDetails = getDomainDetailsFromObinfoString(obInfo);
    if (domainDetails) {
      onSelect(domainDetails);
      toggleOverlay();
      setError(false);
    } else {
      alert(t('qrCodeScanner.errorQRCodeInfo'));
    }
  };

  const EnterQRCodeManually = () => {
    return (
      <BottomSheet ref={ref}>
        <View style={styles(themeColors).bottomSheetContainer}>
          <Space />
          <TextLabel
            style={EnterMobileNumberStyle(themeColors).inputLabel}
            variant={TextLabelVariants.INPUTLABEL}
          >
            {t('qrCodeScanner.enterObInfoManuallyTitle')}
          </TextLabel>
          <InputBox
            multiline
            style={styles(themeColors).textInput}
            keyboardType="default"
            ref={userNameInputRef}
            value={obInfo}
            onChangeText={(val) => {
              setObInfo(val);
            }}
            actionType="done"
            onFocusColor={themeColors.inputBox.inputFocus}
            placeholder={t('qrCodeScanner.enterObInfoManuallyPlaceholder')}
            autoFocus={false}
            autoCapitalize="none"
            onAction={handleSubmitManually}
          />
          <Space />
          <ActionButton
            textStyle={EnterMobileNumberStyle(themeColors).sendText}
            title={t('buttonTitle.done')}
            onPress={() => {
              Keyboard.dismiss();
              handleSubmitManually();
            }}
          />
        </View>
      </BottomSheet>
    );
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
        <ScannerBlurBg
          style={styles(themeColors).blurView}
          bgColor={themeColors.scanner.blurBg}
          scanAreaCornerBg={themeColors.scanner.cornerColor}
        />
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
        {scannerType === 'reviewRequest'?<ScannerPeerButton
          style={{ margin: 5 }}
          enabled={barcodes.length > 0}
          onPress={() => handleGetQRCode()}
          iconColor={themeColors.scanner.cameraBtnBg}
          bgColor={
            isError
              ? themeColors.scanner.providerBtnError
              : themeColors.scanner.providerBtn
          }
        />: <ServiceProvider
            style={{ margin: 5 }}
            enabled={barcodes.length > 0}
            onPress={() => handleGetQRCode()}
            iconColor={themeColors.scanner.cameraBtnBg}
            bgColor={
              isError
                ? themeColors.scanner.providerBtnError
                : themeColors.scanner.providerBtn
            }
          />}
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
            onPress={openBottomSheet}
            bgColor={themeColors.scanner.cameraBtnBg}
            iconColor={themeColors.scanner.cameraButtons}
          />
        </View>
        {EnterQRCodeManually()}
      </View>
    )
  );
};
