import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import styles from "../LoginForm.module.css";
import { CHECK_PASSWORD } from "../../../utils/constans";

interface IProps {
  isLoading: boolean;
}

export const CustomPassword = ({ isLoading }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <label className={styles.label}>Пароль</label>

      <div className={styles.inputWrapper}>
        <InputForm
          type="password"
          {...register("password", {
            required: true,
            validate: (value) => value === CHECK_PASSWORD || "Неверный пароль",
          })}
          className={styles.input}
          isError={errors?.password?.type}
        />
        {errors?.password?.type === "required" && (
          <p className={styles.errorRequired}>Обязательное поле</p>
        )}
        {!isLoading && errors.password && (
          <p className={styles.errorRequired}>{errors.password.message}</p>
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
