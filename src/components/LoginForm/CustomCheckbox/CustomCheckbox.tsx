import styled from "styled-components";
import styles from "../LoginForm.module.css";

interface IProps {
  handleCheckboxChange: () => void;
  isChecked: boolean;
}

export const CustomCheckbox = ({ handleCheckboxChange, isChecked }: IProps) => {
  return (
    <div className={styles.checkboxWrapper} onClick={handleCheckboxChange}>
      <div className={styles.checkbox}>
        <StyledCustomCheckbox isChecked={isChecked} />
      </div>
      Запомнить пароль
    </div>
  );
};

const StyledCustomCheckbox = styled.div<{ isChecked: boolean }>`
  background-color: ${(props) => (props.isChecked ? "#4A67FF" : "#ffffff")};
  width: 100%;
  height: 100%;
  border-radius: 2px;
`;
