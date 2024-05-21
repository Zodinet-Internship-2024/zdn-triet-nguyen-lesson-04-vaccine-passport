import React, { FunctionComponent, useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { fetchProvinces, fetchDistricts, fetchWards } from "./api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./Form.scss";
import { useNavigate } from "react-router-dom";

type FormValues = {
  fullName: string;
  gender: string;
  dob: Date;
  idNumber: number;
  city: string;
  district: string;
  ward: string;
};

const Form: FunctionComponent = () => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);

  const handleCityChange = (cityId: string) => {
    fetchDistricts(cityId).then((data: any[]) => {
      setDistricts(data);
      setWards([]);
    });
  };

  const handleDistrictChange = (districtId: string) => {
    fetchWards(districtId).then((data) => {
      setWards(data);
    });
  };

  const schema = z.object({
    idNumber: z.string().nonempty("Số CMND/CCCD không được để trống")
    .length(12, "Số CMND/CCCD phải có đúng 12 chữ số"),
    dob: z.date().refine((value) => {
      const currentDate = new Date();
      const dobDate = new Date(value);
      return dobDate <= currentDate;
    }, "Ngày sinh không được sau ngày hiện tại"),
  });

  const form = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      gender: "",
      city: "",
      district: "",
      ward: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    reset,
    watch,
  } = form;
  const {
    errors,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitSuccessful,
    isSubmitted,
    submitCount,
  } = formState;

  const onSubmit = (data: FormValues) => {
    const formattedDob = data.dob.toISOString();
    console.log(data);
    navigate(`/${data.idNumber}`, {
      state: { formData: { ...data, dob: formattedDob } },
    });
  };

  const handleBlur = (event: { target: { name: string; value: string } }) => {
    const fullName = getValues("fullName").trim();

    const filteredFullName = fullName.replace(/[^\p{L}\s]/gu, "");

    const normalizedFullName = filteredFullName
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (fullName !== normalizedFullName) {
      setValue("fullName", normalizedFullName);
    }
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Errors", errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log("Submit successful");
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="form">
      <h1>Tra cứu chứng nhận vắc xin!</h1>
      <p className="form__note">
        Vui lòng điền đầy đủ các thông tin để tiến hành tìm kiếm thông tin chứng
        nhận vắc xin của bạn.
      </p>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="fullName">Họ và tên </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            onBlur={handleBlur}
          />
          <p className="error">{errors.fullName?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="gender">Giới tính</label>
          <select {...register("gender")}>
            <option value="female">Nam</option>
            <option value="male">Nữ</option>
            <option value="other">Khác</option>
          </select>
          <p className="error">{errors.gender?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Ngày sinh</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
            })}
            max={new Date().toISOString().split("T")[0]}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="idNumber">Số CMND / Mã định danh cá nhân</label>
          <input
            type="text"
            id="idNumber"
            {...register("idNumber")}
            onKeyDown={(event) => {
              const allowedKeys = [
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
              ];
              if (
                !(event.ctrlKey && event.key.toLowerCase() === "v") &&
                !allowedKeys.includes(event.code) &&
                (isNaN(Number(event.key)) || event.code === "Space")
              ) {
                event.preventDefault();
              }
            }}
            onPaste={(event) => {
              const pastedText = event.clipboardData.getData("text/plain");
              const onlyNumbers = pastedText.replace(/\D/g, ""); // Remove non-numeric characters
              document.execCommand("insertText", false, onlyNumbers); // Insert only numbers
              event.preventDefault();
            }}
          />

          <p className="error">{errors.idNumber?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="city">Tỉnh/Thành phố</label>
          <select
            {...register("city")}
            onChange={(e) => {
              handleCityChange(e.target.value);
            }}
          >
            <option value="">Chọn thành phố</option>
            {provinces.map((province) => (
              <option key={province.province_id} value={province.province_id}>
                {province.province_name}
              </option>
            ))}
          </select>
          <p className="error">{errors.city?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="district">Quận/Huyện</label>
          <select
            {...register("district")}
            onChange={(e) => {
              handleDistrictChange(e.target.value);
            }}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.district_id} value={district.district_id}>
                {district.district_name}
              </option>
            ))}
          </select>
          <p className="error">{errors.district?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="ward">Xã/Phường</label>
          <select {...register("ward")}>
            <option value="">Chọn xã/phường</option>
            {wards.map((ward) => (
              <option key={ward.ward_id} value={ward.ward_id}>
                {ward.ward_name}
              </option>
            ))}
          </select>
          <p className="error">{errors.ward?.message}</p>
        </div>

        {/* <button disabled={!isDirty || !isValid || isSubmitting}>
          Tìm kiếm
        </button> */}
        <button className="button-submit">Tìm kiếm</button>
      </form>
    </div>
  );
};

export default Form;
