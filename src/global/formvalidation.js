import axios from "axios";

const urlRegex =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}([\/\w-]+)?(\/[\w\-\.]+)?\/?(\?[\w\d%&=\-\.]+)?(#\w+)?$/;

export const blurfuction = async (e, msg, seterror, data) => {
  // validation for input attr required  //
  if (
    e.target.hasAttribute("required") &&
    !e.target.value &&
    e.target.name !== "logo" &&
    e.target.name !== "profilePic"
  ) {
    seterror((prev) => ({ ...prev, [e.target.name]: "Can't Be Empty!!" }));
    if (e.target.classList.contains("border-success")) {
      e.target.classList.remove("border-success");
    }
    e.target.classList.add("border-danger");
  }
  // name = websiteURL validating //
  else if (e.target.name === "websiteUrl" && !urlRegex.test(e.target.value)) {
    seterror((prev) => ({
      ...prev,
      [e.target.name]:
        "The website address you entered isn't quite right. Make sure it starts with 'http://' or 'https://' and has a valid website name.",
    }));
    if (e.target.classList.contains("border-success")) {
      e.target.classList.remove("border-success");
    }
    e.target.classList.add("border-danger");
  }
  /////////////
  else if (!e.target.checkValidity()) {
    seterror((prev) => ({ ...prev, [e.target.name]: msg }));
    if (e.target.classList.contains("border-success")) {
      e.target.classList.remove("border-success");
    }
    e.target.classList.add("border-danger");
  }

  // validating officialEmail //
  else if (e.target.name === "officialEmail") {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_Sever_Api}/validatingEmail`,
        { [e.target.name]: e.target.value }
      );
      // console.log(result);
      // in case of success =>
      if (result.data.flag) {
        seterror((prev) => ({ ...prev, [e.target.name]: "" }));
        if (e.target.classList.contains("border-danger")) {
          e.target.classList.remove("border-danger");
        }
        e.target.classList.add("border-success");
      } else {
        seterror((prev) => ({
          ...prev,
          [e.target.name]: result.response.data.message || result.data.message,
        }));
        if (e.target.classList.contains("border-success")) {
          e.target.classList.remove("border-success");
        }
        e.target.classList.add("border-danger");
      }
    } catch (err) {
      console.error(err);
      seterror((prev) => ({
        ...prev,
        [e.target.name]: err.response.data.message,
      }));
      if (e.target.classList.contains("border-success")) {
        e.target.classList.remove("border-success");
      }
      e.target.classList.add("border-danger");
    }
  }

  // validatig confirm password //
  else if (
    e.target.name === "CPassword" &&
    data.password &&
    e.target.value !== data.password
  ) {
    seterror((prev) => ({
      ...prev,
      [e.target.name]: "The passwords entered do not match.",
    }));
    if (e.target.classList.contains("border-success")) {
      e.target.classList.remove("border-success");
    }
    e.target.classList.add("border-danger");
  }
  //else if (
  //     e.target.name === "Username" ||
  //     e.target.name === "BusinessEmail" ||
  //     e.target.name === "PrimaryContactEmail"
  //   ) {
  //     const data = {
  //       name: e.target.name,
  //       value: e.target.value,
  //     };

  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     };

  //     dispatch(CheckUnique(options));
  //   }

  // after all successful operations //
  else {
    seterror((prev) => ({ ...prev, [e.target.name]: "" }));
    if (e.target.classList.contains("border-danger")) {
      e.target.classList.remove("border-danger");
    }
    e.target.classList.add("border-success");
  }
};

export const submitvalidation = async (Reference, seterror, data, id) => {
  // console.log(
  //   Reference.name,
  //   ":",
  //   Reference.value,
  //   ":",
  //   Reference.checkValidity(),
  //   ":",
  //   Reference.hasAttribute("required"),
  //   ":",
  //   Reference.title
  // );
  if (
    Reference.hasAttribute("required") &&
    !Reference.value &&
    Reference.name !== "logo" &&
    Reference.name !== "profilePic"
  ) {
    seterror((prev) => ({ ...prev, [Reference.name]: "Can't Be Empty!!" }));
    if (Reference.classList.contains("border-success")) {
      Reference.classList.remove("border-success");
    }
    Reference.classList.add("border-danger");
    return false;
    // check validity of website url
  } else if (
    Reference.name === "websiteUrl" &&
    !urlRegex.test(Reference.value)
  ) {
    seterror((prev) => ({
      ...prev,
      [Reference.name]:
        "The website address you entered isn't quite right. Make sure it starts with 'http://' or 'https://' and has a valid website name.",
    }));
    if (Reference.classList.contains("border-success")) {
      Reference.classList.remove("border-success");
    }
    Reference.classList.add("border-danger");
    return false;
  }
  ///////////////
  else if (!Reference.checkValidity()) {
    seterror((prev) => ({ ...prev, [Reference.name]: Reference.title }));
    if (Reference.classList.contains("border-success")) {
      Reference.classList.remove("border-success");
    }
    Reference.classList.add("border-danger");
    return false;
  }
  // check validity of official email //
  else if (Reference.name === "officialEmail" && !id) {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_Sever_Api}/validatingEmail`,
        { [Reference.name]: Reference.value }
      );
      // console.log(result);
      if (result.data.flag) {
        seterror((prev) => ({ ...prev, [Reference.name]: "" }));
        if (Reference.classList.contains("border-danger")) {
          Reference.classList.remove("border-danger");
        }
        Reference.classList.add("border-success");
        return true;
      } else {
        seterror((prev) => ({
          ...prev,
          [Reference.name]: result.response.data.message || result.data.message,
        }));
        if (Reference.classList.contains("border-success")) {
          Reference.classList.remove("border-success");
        }
        Reference.classList.add("border-danger");
        return false;
      }
    } catch (err) {
      console.error(err);
      seterror((prev) => ({
        ...prev,
        [Reference.name]: err.response.data.message,
      }));
      if (Reference.classList.contains("border-success")) {
        Reference.classList.remove("border-success");
      }
      Reference.classList.add("border-danger");
      return false;
    }
    // check validity of C password //
  } else if (
    Reference.name === "CPassword" &&
    (data.password || !id) &&
    Reference.value !== data.password
  ) {
    seterror((prev) => ({
      ...prev,
      [Reference.name]: "The passwords entered do not match.",
    }));
    if (Reference.classList.contains("border-success")) {
      Reference.classList.remove("border-success");
    }
    Reference.classList.add("border-danger");
    return false;
  }
  //else if (
  //     Reference.name === "Username" ||
  //     Reference.name === "BusinessEmail" ||
  //     Reference.name === "PrimaryContactEmail"
  //   ) {
  //     const data = {
  //       name: Reference.name,
  //       value: Reference.value,
  //     };

  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     };

  //     dispatch(CheckUnique(options));
  //   }
  else {
    seterror((prev) => ({ ...prev, [Reference.name]: "" }));
    if (Reference.classList.contains("border-danger")) {
      Reference.classList.remove("border-danger");
    }
    Reference.classList.add("border-success");
    return true;
  }

  // if (Reference.current && !Reference.current.checkValidity()) {
  //   console.log("inner:", Reference.current);
  //   if (Reference.current.classList.contains("border-success")) {
  //     Reference.current.classList.remove("border-success");
  //   }
  //   Reference.current.classList.add("border-danger");
  //   return false;
  // } else {
  //   if (Reference.current.classList.contains("border-danger")) {
  //     Reference.current.classList.remove("border-danger");
  //   }
  //   Reference.current.classList.add("border-success");
  //   return true;
  // }
};

export const remove_border_color = (Reference) => {
  Reference.value = "";

  Reference.classList.remove("border-danger", "border-success");
};
export function isImage(file) {
  // Check if the file is not null
  if (file) {
    // Get the MIME type of the file
    const fileType = file.type;

    // Check if the MIME type starts with 'image/'
    return fileType.startsWith("image/");
  }

  // Return false if the file is null or undefined
  return false;
}
