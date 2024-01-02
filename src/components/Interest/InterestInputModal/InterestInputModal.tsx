import { useFormik } from "formik";
import * as Yup from "yup";
import { modalCard } from "@/utils/modalCard";
import Modal from "react-modal";

import Button from "@/components/Common/Button";
import InterestModalHeader from "../Temp/InterestModalHeader";
import InterestModalInput from "../Temp/InterestModalInput";
import { ChangeEvent, useState } from "react";
type ModalProps = {
  inputModalIsOpen: boolean;
  setInputModalIsOpen: (isOpen: boolean) => void;
};
const InterestInputModal = ({
  inputModalIsOpen,
  setInputModalIsOpen,
}: ModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const validationSchema = Yup.object().shape({
    InterestInput: Yup.string()
      .trim()
      .test(
        "empty",
        "앞에 공백이 있으면 안됩니다.",
        (value) => value?.trim() !== ""
      )
      .test("specialChars", "특수문자 기호는 안됩니다.", (value) =>
        /^[^\s~`!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+$/.test(value || "")
      ),
  });

  const formik = useFormik({
    initialValues: {
      InterestInput: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    formik.setFieldTouched("InterestInput", true, false);
  };

  const closeModal = () => {
    setInputModalIsOpen(false);
  };
  const inputText = () => {
    setInputValue(formik.values.InterestInput);
  };
  console.log(inputValue);
  return (
    <Modal
      isOpen={inputModalIsOpen}
      onRequestClose={closeModal}
      contentLabel="input message"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={modalCard}
    >
      <InterestModalHeader closeModal={closeModal} />
      <form onSubmit={formik.handleSubmit}>
        <InterestModalInput
          id="InterestInput"
          name="InterestInput"
          placeholder="관심사를 입력해주세요 (10자까지)"
          maxLength={10}
          value={formik.values.InterestInput}
          handleInputChange={handleInputChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.InterestInput && formik.errors.InterestInput
              ? formik.errors.InterestInput
              : null
          }
        />
      </form>
      <Button
        content={"관심사 추가하기"}
        width={"w-full"}
        height={"h-[4.4rem]"}
        backgroundColor={"bg-_primary-50"}
        textSize={"text-_body1"}
        textColor={"text-white"}
        fontWeight={"font-semibold"}
        handleClick={inputText}
      />
    </Modal>
  );
};

export default InterestInputModal;
