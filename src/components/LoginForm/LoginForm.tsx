import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { CustomCheckbox } from "./CustomCheckbox/CustomCheckbox";
import { CustomInput } from "./CustomInput/CustomInput";
import { CustomPassword } from "./CustomPassword/CustomPassword";
import styles from "./LoginForm.module.css";

interface IFormInput {
  login: string;
  password: string;
}

interface IProps {
  logIn: (userName: string, isRemember: boolean) => void;
}

export const LoginForm = ({ logIn }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const methods = useForm<IFormInput>({
    defaultValues: { login: "", password: "" },
  });

  const { handleSubmit, getValues } = methods;

  const startSubmitting = (callback?: () => void) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (callback) callback();
    }, 2000);
  };

  const onSubmit = (data: IFormInput) => {
    startSubmitting(() => {
      logIn(data.login, isChecked);
    });
  };

  const onError = () => {
    const loginValue = getValues("login");
    const passwordValue = getValues("password");

    if (loginValue && passwordValue) {
      startSubmitting();
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.formWrapper}>
      <FormProvider {...methods}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <CustomInput isLoading={isLoading} />
          <CustomPassword isLoading={isLoading} />
          <CustomCheckbox
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
          />

          <SubmitButton
            disabled={isLoading}
            type="submit"
            isLoading={isLoading}
          >
            Войти
          </SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
};

const SubmitButton = styled.button<{ isLoading: boolean }>`
  background-color: ${(props) => (props.isLoading ? "#99A9FF" : "#4A67FF")};
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  height: 60px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-top: 40px;
  width: 100%;
`;
