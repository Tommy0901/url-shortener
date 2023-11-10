// 使用 navigator:clipboard 的方法 writeText() 來實現複製功能
async function copy() {
  // Get the text of inputURL
  const URL = document.getElementById("inputURL").innerText;
  try {
    await navigator.clipboard.writeText(URL);
    // Alert user the copied content
    alert("Copied : " + URL);
  } catch {
    console.error("Unable to copy: ", err);
  }
}
