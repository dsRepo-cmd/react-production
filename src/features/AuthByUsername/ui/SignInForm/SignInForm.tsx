import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./SignInForm.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { loginActions, loginReducer } from "../../model/slice/loginSlise";
import { getLoginEmail } from "../../model/selectors/getLoginEmail/getLoginEmail";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginErrors } from "../../model/selectors/getLoginErrors/getLoginErrors";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import Text from "@/shared/ui/redesigned/Text/Text";
import Input from "@/shared/ui/redesigned/Input/Input";
import Button from "@/shared/ui/redesigned/Button/Button";
import { signInByEmail } from "../../model/services/signInByEmail/signInByEmail";
import { ValidateAuthError } from "../../model/const/const";

export interface SignInFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducerList = {
  loginForm: loginReducer,
};

const SignInForm: React.FC<SignInFormProps> = memo(
  ({ className, onSuccess }: SignInFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);

    // Validate errors
    const validateErrors = useSelector(getLoginErrors);

    const validateErrorTranslates: { [key: string]: string } = {
      [ValidateAuthError.SERVER_ERROR]: t("Wrong email or password"),
      [ValidateAuthError.INCORRECT_EMAIL]: t(
        "Enter the correct value of the e-mail address"
      ),
      [ValidateAuthError.INCORRECT_PASSWORD]: t(
        "The password must be at least 8 characters long, including at least one number and an uppercase letter"
      ),
      [ValidateAuthError.NO_DATA]: t("No data"),
    };

    ////

    const onChangeEmail = useCallback(
      (value: string) => {
        dispatch(loginActions.setEmail(value));
      },
      [dispatch]
    );

    const onChangePassword = useCallback(
      (value: string) => {
        dispatch(loginActions.setPassword(value));
      },
      [dispatch]
    );

    const onLoginClick = useCallback(async () => {
      const result = await dispatch(signInByEmail({ email, password }));

      if (result.meta.requestStatus === "fulfilled") {
        onSuccess();
      }
    }, [onSuccess, dispatch, password, email]);

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          onLoginClick();
        }
      },
      [onLoginClick]
    );

    const loginForm = (
      <VStack gap="16" className={classNames(cls.SignInForm, {}, [className])}>
        <Text title={t("Sign in form")} />

        <Input
          name={"email"}
          autofocus
          type="text"
          className={cls.input}
          placeholder={t("Email")}
          onChange={onChangeEmail}
          onKeyDown={handleKeyPress}
          value={email}
          error={
            validateErrors?.email &&
            validateErrorTranslates[validateErrors?.email]
          }
        />
        <Input
          type="text"
          name={"password"}
          className={cls.input}
          placeholder={t("Password")}
          onChange={onChangePassword}
          onKeyDown={handleKeyPress}
          value={password}
          password
          error={
            validateErrors?.password &&
            validateErrorTranslates[validateErrors?.password]
          }
        />
        <Button
          className={cls.loginBtn}
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {t("Sign in")}
        </Button>

        {validateErrors?.data && (
          <Text
            variant={"error"}
            text={validateErrorTranslates[validateErrors.data]}
          />
        )}

        <HStack gap="8">
          <Text text={t("Forgot your password?")} />
          <Button variant={"clear"}>Restore</Button>
        </HStack>
      </VStack>
    );

    return (
      <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        {loginForm}
      </DynamicModuleLoader>
    );
  }
);

export default SignInForm;