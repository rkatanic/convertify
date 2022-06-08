export const downloadTextFile = (text: string) => {
  const element = document.createElement("a");
  const file = new Blob([text], {
    type: "text/plain",
  });
  element.href = URL.createObjectURL(file);
  element.download = "myFile.txt";
  element.click();
};

export const copyText = (text: string): void => {
  navigator.clipboard.writeText(text);
};
