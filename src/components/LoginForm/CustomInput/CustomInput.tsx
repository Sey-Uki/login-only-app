import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import styles from "../LoginForm.module.css";
import { CHECK_LOGIN } from "../../../utils/constans";

interface IProps {
  isLoading: boolean;
}

export const CustomInput = ({ isLoading }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {!isLoading && errors?.login?.type !== "required" && errors.login && (
        <div className={styles.errorLogin}>
          <span>!</span>
          {errors.login.message}
        </div>
      )}
      <label className={styles.label}>Логин</label>

      <div className={styles.inputWrapper}>
        <InputForm
          {...register("login", {
            required: true,
            validate: (value) =>
              value === CHECK_LOGIN || `Пользователя ${value} не существует`,
          })}
          isError={errors?.login?.type}
          className={styles.input}
        />
        {errors?.login?.type === "required" && (
          <p className={styles.errorRequired}>Обязательное поле</p>
        )}
      </div>
    </>
  );
};

const InputForm = styled.input<{ isError: any }>`
  color: ${(props) => (props.isError === "required" ? "#E26F6F" : "#232323")};
  border: ${(props) =>
    props.isError === "required" ? "1px solid #E26F6F" : "none"};
  background: #f5f5f5;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  height: 60px;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  font-family: "Helvetica 65 Medium", sans-serif;
`;
