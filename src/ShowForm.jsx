import React, { useEffect} from "react";
import {
  TextInput,
  DropdownSingle,
  CheckboxList,
  RadioList,
  DatePicker,
} from "oolib";
import axios from "axios";
import { useQuery } from "react-query";
const FormComponent = () => {
  const fetchFormData = async () => {
    const { data } = await axios.get("http://127.0.0.1:3001/form-data");
    return data;
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const { data, isLoading, isError } = useQuery("formData", fetchFormData);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const componentMap = {
    TextInput: ({ field, index }) => (
      <TextInput
        key={index}
        id={field.props.id}
        label={field.props.label}
        sublabel={field.props.sublabel}
        placeholder={field.props.placeholder}
        required={field.isRequired}
      />
    ),
    DropdownSingle: ({ field, index }) => (
      <DropdownSingle
        key={index}
        id={field.props.id}
        label={field.props.label}
        options={field.props.options}
        required={field.isRequired}
      />
    ),
    CheckboxList: ({ field, index }) => (
      <CheckboxList
        key={index}
        id={field.props.id}
        label={field.props.label}
        options={field.props.options}
        required={field.isRequired}
      />
    ),
    RadioList: ({ field, index }) => (
      <RadioList
        key={index}
        id={field.props.id}
        label={field.props.label}
        sublabel={field.props.sublabel}
        options={field.props.options}
        required={field.isRequired}
      />
    ),
    DatePicker: ({ field, index }) => (
      <DatePicker
        key={index}
        id={field.props.id}
        label={field.props.label}
        sublabel={field.props.sublabel}
        required={field.isRequired}
      />
    ),
  };
  return (
    <div className="form-container">
      {data.map((field, index) => {
        const Component = componentMap[field.comp];
        return Component ? <Component field={field} index={index} /> : null;
      })}
    </div>
  );
};

export default FormComponent;
