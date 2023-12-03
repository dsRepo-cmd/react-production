import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Text.module.scss";
import { useTranslation } from "react-i18next";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
}

export enum TextAlign {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

const Text: React.FC<TextProps> = memo(
  ({
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
  }: TextProps) => {
    const { t } = useTranslation();

    const mods = {
      [cls[theme]]: true,
      [cls[align]]: true,
    };

    return (
      <div className={classNames(cls.Text, mods, [className])}>
        {title && <p className={cls.title}>{title}</p>}
        {text && <p className={cls.text}>{text}</p>}
      </div>
    );
  }
);

export default Text;
