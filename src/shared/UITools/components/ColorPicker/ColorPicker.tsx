import { Color } from 'antd/es/color-picker';
import { ColorPicker as ColorPickerAntd, ColorPickerProps } from 'antd';
import { FC, useState } from 'react';

// components
import Panel from './components/Panel/Panel';
import TextField from '../TextField/TextField';

// hooks
import { useTheme } from 'hooks';

// others
import { classes, className, classNames } from './classNames';

// styles
import styles from './color-picker.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import { TUIProps } from '../../../UI/types';

// utils
import { getAttributes } from '../../../E2EDataAttributes/utils';

export type TColorPickerProps = TUIProps<typeof classes> &
  Omit<ColorPickerProps, 'arrow' | 'onOpenChange' | 'open' | 'panelRender'> & {
    e2eValue?: TE2EDataAttributeProps['value'];
    onChange: (value: string) => void;
  };

export const ColorPicker: FC<TColorPickerProps> = ({
  classes = { className: '' },
  e2eValue = '',
  onChange,
  ...restProps
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const [visible, setVisible] = useState(false);

  const onChangeHandler = (value: Color) => {
    onChange(`#${value.toHex()}`);
  };

  return (
    <TextField
      startAdornment={
        <ColorPickerAntd
          arrow={false}
          className={cx(classes.className, classNamesWithTheme[className])}
          onChange={onChangeHandler}
          onOpenChange={(visible) => setVisible(visible)}
          open={visible}
          panelRender={(children) => (
            <Panel setVisible={setVisible}>{children}</Panel>
          )}
          {...getAttributes(E2EAttribute.colorPicker, e2eValue)}
          {...restProps}
        >
          <div
            className={cx(classNamesWithTheme.picker)}
            style={{ backgroundColor: restProps.value as string }}
          />
        </ColorPickerAntd>
      }
      value={(restProps.value as string).substring(1)}
    />
  );
};

export default ColorPicker;
