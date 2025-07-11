import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

const CustomQRCode = ({
    value,
    size = 256,
    fgColor = '#000000',
    bgColor = '#ffffff',
    dotType = 'square',
    cornerSquareType = 'square',
    cornerDotType = 'square',
    eyeColor = '#000000',
    eyeBallColor = '#000000',
    logo,
    logoSize = 30,
    level = 'H',
    margin = 4,
    includeMargin = false
}) => {
    const ref = useRef(null);
    const qrCode = useRef(null);

    useEffect(() => {
        qrCode.current = new QRCodeStyling({
            width: size,
            height: size,
            data: value,
            margin: includeMargin ? margin : 0,
            qrOptions: {
                errorCorrectionLevel: level
            },
            image: logo || '',
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 0,
                imageSize: logo ? logoSize / 100 : 0.2,
                excavate: true
            },
            dotsOptions: {
                color: fgColor,
                type: dotType,
            },
            cornersSquareOptions: {
                color: eyeColor,
                type: cornerSquareType,
            },
            cornersDotOptions: {
                color: eyeBallColor,
                type: cornerDotType,
            },
            backgroundOptions: {
                color: bgColor,
            },
        });

        if (ref.current) {
            qrCode.current.append(ref.current);
        }

        return () => {
            if (ref.current) {
                ref.current.innerHTML = '';
            }
        };
    }, []);

    useEffect(() => {
        if (qrCode.current) {
            qrCode.current.update({
                width: size,
                height: size,
                data: value,
                margin: includeMargin ? margin : 0,
                qrOptions: {
                    errorCorrectionLevel: level
                },
                image: logo || '',
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 0,
                    imageSize: logo ? logoSize / 100 : 0.2,
                    excavate: true
                },
                dotsOptions: {
                    color: fgColor,
                    type: dotType,
                },
                cornersSquareOptions: {
                    color: eyeColor,
                    type: cornerSquareType,
                },
                cornersDotOptions: {
                    color: eyeBallColor,
                    type: cornerDotType,
                },
                backgroundOptions: {
                    color: bgColor,
                },
            });
        }
    }, [value, size, fgColor, bgColor, dotType, cornerSquareType, cornerDotType, eyeColor, eyeBallColor, logo, logoSize, level, margin, includeMargin]);

    return <div ref={ref} />;
};

export default CustomQRCode;
