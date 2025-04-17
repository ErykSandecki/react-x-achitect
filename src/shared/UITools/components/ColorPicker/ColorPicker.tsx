import { Color } from 'antd/es/color-picker';
import { ColorPicker as ColorPickerAntd, ColorPickerProps } from 'antd';
import { FC, useState } from 'react';

// components
import Panel from './components/Panel/Panel';

// others
import { classes } from './classNames';

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
  const [visible, setVisible] = useState(false);

  const onChangeHandler = (value: Color) => {
    onChange(`#${value.toHex()}`);
  };

  return (
    <ColorPickerAntd
      arrow={false}
      className={classes.className}
      onChange={onChangeHandler}
      onOpenChange={(visible) => setVisible(visible)}
      open={visible}
      panelRender={(children) => (
        <Panel setVisible={setVisible}>{children}</Panel>
      )}
      {...getAttributes(E2EAttribute.colorPicker, e2eValue)}
      {...restProps}
    />
  );
};

export default ColorPicker;
