export const inputFormElements = [
    {
      name: "ChildID",
      placeholder: "Enter child ID",
      label: "Child ID",
      variant: "outlined",
      fullWidth: true,
      required: true,
      xs: 12,
      sm: 6
    },
    {
      name: "Name",
      placeholder: "Enter name",
      label: "Name",
      variant: "outlined",
      fullWidth: true,
      required: false,
      xs: 12,
      sm: 6
    },
    {
      name: "DOB",
      type: "date",
      label: "DOB",
      placeholder: "",
      variant: "outlined",
      fullWidth: true,
      required: false,
      xs: 12,
      sm: 6
    },
    {
      name: "Orphanage",
      type: "text",
      placeholder: "Enter orphanage",
      label: "Orphanage Name",
      variant: "outlined",
      fullWidth: true,
      required: true,
      xs: 12,
      sm: 6
    },
    {
      name: "Gender",
      label: "Gender",
      variant: "outlined",
      fullWidth: true,
      required: true,
      xs: 12,
      sm: 6,
      select: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" }
      ]
    },
    {
      name: "Category",
      label: "Category",
      variant: "outlined",
      fullWidth: true,
      required: true,
      xs: 12,
      sm: 6,
      select: true,
      options: [
        { value: "abandon", label: "Abandon" },
        { value: "surrender", label: "Surrender" },
        { value: "admitted", label: "Admitted" }
      ]
    },
    {
      name: "city",
      placeholder: "Enter city name",
      label: "City",
      variant: "outlined",
      fullWidth: true,
      required: true,
      xs: 12,
      sm: 6
    },
    {
      name: "start date",
      type: "date",
      label: "Start Date",
      placeholder: "",
      variant: "outlined",
      fullWidth: true,
      required: false,
      xs: 12,
      sm: 6
    },
    {
      name: "state",
      placeholder: "Enter state",
      label: "State",
      variant: "outlined",
      fullWidth: true,
      required: true,
      xs: 12,
      sm: 6
    },
    {
      name: "end date",
      type: "date",
      label: "End Date",
      placeholder: "",
      variant: "outlined",
      fullWidth: true,
      required: false,
      xs: 12,
      sm: 6
    },
    {
      name: "Enrollment date",
      type: "date",
      label: "Enrollment Date",
      placeholder: "",
      variant: "outlined",
      fullWidth: true,
      required: true,
      xs: 12,
      sm: 6
    },
    
  ];