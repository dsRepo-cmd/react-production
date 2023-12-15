import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import cls from "../ArticleListItem.module.scss";
import { ArticleListItemProps } from "../ArticleListItem";
import Text from "@/shared/ui/deprecated/Text/Text";
import { Icon } from "@/shared/ui/deprecated/Icon/Icon";
import {
  ArticleBlockType,
  ArticleView,
} from "@/entities/Article/model/consts/consts";
import { ArticleTextBlock } from "@/entities/Article/model/types/article";
import { classNames } from "@/shared/lib/classNames";
import Card from "@/shared/ui/deprecated/Card/Card";
import Avatar from "@/shared/ui/deprecated/Avatar/Avatar";
import AppImage from "@/shared/ui/redesigned/AppImage/AppImage";
import ArticleTextBlockComponent from "../../ArticleTextBlockComponent/ArticleTextBlockComponent";
import AppLink from "@/shared/ui/deprecated/AppLink/AppLink";
import { getRouteArticleDetails } from "@/shared/const/router";
import Button, { ButtonTheme } from "@/shared/ui/deprecated/Button/Button";
import Skeleton from "@/shared/ui/deprecated/Skeleton/Skeleton";

const ArticleListItemDeprecated: FC<ArticleListItemProps> = ({
  className,
  article,
  view,
  target,
}) => {
  const { t } = useTranslation();

  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <div
        data-testid="ArticleListItem"
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button theme={ButtonTheme.OUTLINE}>{t("Read more...")}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            alt={article.title}
            src={article.img}
            className={cls.img}
          />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
};
export default memo(ArticleListItemDeprecated);