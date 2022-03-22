export function imageRatioCheck(imageFile, callback) {
  // Create FileReader instance
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      const w = this.width;
      const h = this.height;

      if (w / h < 0.9 || w / h > 1.1) {
        alert('사진 비율이 1:1이 아닙니다. 사진을 다시 업로드 해주세요.');
        imageFile.value = '';
      } else {
        callback(imageFile);
      }
    };
  };
  reader.readAsDataURL(imageFile);
  return reader;
}
