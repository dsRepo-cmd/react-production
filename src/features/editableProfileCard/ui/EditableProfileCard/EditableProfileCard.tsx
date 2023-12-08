import { classNames } from "shared/lib/classNames";
import { useTranslation } from "react-i18next";
import cls from "./EditableProfileCard.module.scss";
import React, { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import Text, { TextTheme } from "shared/ui/Text/Text";
import { Currency } from "entities/Currency/model/types/currency";
import { Country } from "entities/Coutnry/model/types/country";
import { getProfileForm } from "features/editableProfileCard/model/selectors/getProfileForm/getProfileForm";
import { getProfileIsLoading } from "features/editableProfileCard/model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileError } from "features/editableProfileCard/model/selectors/getProfileError/getProfileError";
import { getProfileReadonly } from "features/editableProfileCard/model/selectors/getProfileReadonly/getProfileReadonly";
import { getProfileValidateErrors } from "features/editableProfileCard/model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import { fetchProfileData } from "features/editableProfileCard/model/services/fetchProfileData/fetchProfileData";
import {
  profileActions,
  profileReducer,
} from "features/editableProfileCard/model/slice/ProfileSlice";
import { ProfileCard } from "entities/Profile";
import { ValidateProfileError } from "features/editableProfileCard/model/types/editableProfileCardSchema";
import DynamicModuleLoader, {
  ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import EditableProfileCardHeader from "../EditableProfileCardHeader/EditableProfileCardHeader";
import { VStack } from "shared/ui/Stack";

interface EditableProfileCardProps {
  className?: string;
  id: string;
}

const reducers: ReducerList = {
  profile: profileReducer,
};

export const EditableProfileCard: React.FC<EditableProfileCardProps> = ({
  className,
  id,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);
  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t("Server error"),
    [ValidateProfileError.INCORRECT_AGE]: t("Incorrect age"),
    [ValidateProfileError.INCORRECT_USER_DATA]: t("Incorrect user data"),
    [ValidateProfileError.INCORRECT_COUNTRY]: t("Incorrect country"),
    [ValidateProfileError.NO_DATA]: t("No data"),
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  }, [dispatch]);

  const onChangeFirstname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || "" }));
    },
    [dispatch]
  );

  const onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || "" }));
    },
    [dispatch]
  );

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || "" }));
    },
    [dispatch]
  );

  const onChangeAge = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    },
    [dispatch]
  );

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || "" }));
    },
    [dispatch]
  );

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || "" }));
    },
    [dispatch]
  );

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch]
  );

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch]
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack
        gap="16"
        max
        className={classNames(cls.EditableProfileCard, {}, [className])}
      >
        <EditableProfileCardHeader />
        {validateErrors?.length &&
          validateErrors.map((err) => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[err]}
            />
          ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </VStack>
    </DynamicModuleLoader>
  );
};
export default memo(EditableProfileCard);