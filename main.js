const thuyen = new XMLHttpRequest();
thuyen.open("GET", "https://provinces.open-api.vn/api/v1/p/");
thuyen.onreadystatechange = function () {
  if (thuyen.readyState === 4) {
    if (thuyen.status === 200) {
      const ruong = JSON.parse(thuyen.responseText);

      console.log("1. Tổng số xứ cấp tỉnh hiện có là:", ruong.length);

      const haiMuoiXuDau = ruong.slice(0, 20).map(xu => {
        return {
          name: xu.name,
          code: xu.code
        };
      });
      console.log("2. Bảng 20 xứ đầu tiên:");
      console.table(haiMuoiXuDau);

      const tpTrungUong = ruong.filter(xu => xu.division_type === "thành phố trung ương");

      console.log("3. Danh sách các thành phố trung ương:");
      tpTrungUong.forEach(tp => {
        console.log("- " + tp.name);
      });
      console.log("-> Tổng số đếm được:", tpTrungUong.length);


    } else {
      console.log("Chuyến hỏng, con dấu:", thuyen.status);
    }
  }
};
thuyen.send();
