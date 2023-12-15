import React, { memo, HTMLAttributeAnchorTarget } from "react";
import { Article } from "../../model/types/article";
import { ArticleView } from "../../model/consts/consts";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
import ArticleListItemDeprecated from "./ArticleListItemDeprecated/ArticleListItemDeprecated";
import ArticleListItemRedesigned from "./ArticleListItemRedesigned/ArticleListItemRedesigned";

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const ArticleListItem: React.FC<ArticleListItemProps> = (props) => {
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  );
};

export default memo(ArticleListItem);
