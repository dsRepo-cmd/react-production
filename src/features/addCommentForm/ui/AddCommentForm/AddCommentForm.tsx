import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./AddCommentForm.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../model/slices/addCommentFormSlice";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { HStack } from "@/shared/ui/redesigned/Stack";
import Button from "@/shared/ui/redesigned/Button/Button";

import Input from "@/shared/ui/redesigned/Input/Input";
import Card from "@/shared/ui/redesigned/Card/Card";

interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducerList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  className,
  onSendComment,
}) => {
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch]
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || "");
    onCommentTextChange("");
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Card padding="24" border={"partial"} max>
        <HStack
          data-testid="AddCommentForm"
          justify="between"
          max
          gap="16"
          className={classNames(cls.AddCommentFormRedesigned, {}, [className])}
        >
          <Input
            className={cls.input}
            placeholder={t("Enter comment text")}
            value={text}
            data-testid="AddCommentForm.Input"
            onChange={onCommentTextChange}
          />
          <Button data-testid="AddCommentForm.Button" onClick={onSendHandler}>
            {t("Send")}
          </Button>
        </HStack>
      </Card>
    </DynamicModuleLoader>
  );
};

export default memo(AddCommentForm);
