const API_URL = process.env.REACT_APP_API_URL;

const buildUrl = (path, query) => {
  const url = new URL(API_URL);
  url.pathname = path;
  for (const key of Object.keys(query)) {
    url.searchParams.append(key, query[key]);
  }
  return url.toString();
};

export const get = async (path, query = {}) => {
  const response = await fetch(buildUrl(path, query));
  return await response.json();
};

export const post = async (path, values = {}, query = {}) => {
  const response = await fetch(buildUrl(path, query), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return await response.json();
};

export const put = async (path, values = {}, query = {}) => {
  const response = await fetch(buildUrl(path, query), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return await response.json();
};

export const del = async (path, query = {}) => {
  const response = await fetch(buildUrl(path, query), {
    method: "DELETE",
  });
  return await response.json();
};

export const download = async (path, filename, query = {}) => {
  const response = await fetch(buildUrl(path, query));
  const blob = await response.blob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    }, 150);
  };
  a.addEventListener("click", clickHandler, false);
  a.click();
};
