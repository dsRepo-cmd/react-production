import React, { memo, ReactNode } from "react";
import { classNames, Mods } from "shared/lib/classNames";
import cls from "./Drawer.module.scss";

import Portal from "../Portal/Portal";
import Overlay from "../Overlay/Overlay";
import { useTheme } from "app/providers/ThemeProvider";
import { useModal } from "shared/lib/hooks/useModal/useModal";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}) => {
  const { theme } = useTheme();

  const { close, isClosing, isMounted } = useModal({
    animationDelay: 300,
    onClose,
    isOpen,
  });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }
  return (
    <Portal>
      <div
        className={classNames(cls.Drawer, mods, [
          className,
          theme,
          "app_drawer",
        ])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};

export default memo(Drawer);
