const thuyenMot = new XMLHttpRequest();
thuyenMot.open("GET", "https://provinces.open-api.vn/api/v1/p/");
thuyenMot.onreadystatechange = function () {
  if (thuyenMot.readyState === 4) {
    if (thuyenMot.status === 200) {
      const haiDo = JSON.parse(thuyenMot.responseText);
      const xu = haiDo.find(function (x) {
        return x.name.includes("Hồ Chí Minh");
      });
      if (xu) {
        console.log(`Bắt đầu lấy dữ liệu cho: ${xu.name} (Mã: ${xu.code})`);
        const thuyenHai = new XMLHttpRequest();
        thuyenHai.open("GET", `https://provinces.open-api.vn/api/v1/p/${xu.code}?depth=2`);
        thuyenHai.onreadystatechange = function () {
          if (thuyenHai.readyState === 4) {
            if (thuyenHai.status === 200) {
              const ruongHai = JSON.parse(thuyenHai.responseText);
              const danhSachHuyen = ruongHai.districts;

              console.log(`Danh sách quận/huyện của ${xu.name}`);
              const bangHuyen = danhSachHuyen.map(function(huyen) {
                return {
                  "Tên": huyen.name,
                  "Mã code": huyen.code
                };
              });
              console.table(bangHuyen);
            } else {
              console.log("Thuyền hai hỏng, con dấu:", thuyenHai.status);
            }
          }
        };
        thuyenHai.send();
      } else {
        console.log("Không tìm thấy xứ được yêu cầu.");
      }
    } else {
      console.log("Thuyền một hỏng, con dấu:", thuyenMot.status);
    }
  }
};
thuyenMot.send();
