function goiAPI(duongDan, khiXong, khiLoi) {
  const thuyen = new XMLHttpRequest();
  thuyen.open("GET", duongDan);
  thuyen.onreadystatechange = function () {
    if (thuyen.readyState === 4) {
      if (thuyen.status === 200) {
        khiXong(JSON.parse(thuyen.responseText));
      } else {
        khiLoi(thuyen.status);
      }
    }
  };
  thuyen.send();
}

goiAPI(
  "https://provinces.open-api.vn/api/v1/p/",
  function (haiDo) {
    console.log("BẮT ĐẦU CHUYẾN B1");
    console.log("1. Tổng số xứ cấp tỉnh hiện có là:", haiDo.length);

    const haiMuoiXuDau = haiDo.slice(0, 20).map(xu => ({ name: xu.name, code: xu.code }));
    console.log("2. Bảng 20 xứ đầu tiên:");
    console.table(haiMuoiXuDau);

    const tpTrungUong = haiDo.filter(xu => xu.division_type === "thành phố trung ương");
    console.log("3. Danh sách các thành phố trung ương:");
    tpTrungUong.forEach(tp => console.log("- " + tp.name));
    console.log("-> Tổng số đếm được:", tpTrungUong.length);
    console.log('\n');
  },
  function (ma) {
    console.log("Chuyến B1 hỏng, con dấu:", ma);
  }
);

goiAPI(
  "https://api.vietqr.io/v2/banks",
  function (ruong) {
    const dataNganHang = ruong.data;
    console.log("BẮT ĐẦU CHUYẾN B2");
    console.log("1. Tổng số nhà băng hiện có là:", dataNganHang.length);

    const bangShortNameVaBin = dataNganHang.map(bank => ({ shortName: bank.shortName, bin: bank.bin }));
    console.log("2. Bảng shortName và bin của các nhà băng:");
    console.table(bangShortNameVaBin);

    const tenNganHangCuaBan = "MB";
    const nganHangCuaToi = dataNganHang.find(bank => bank.shortName === tenNganHangCuaBan);
    if (nganHangCuaToi) {
      console.log(`3. Tên đầy đủ của ngân hàng ${tenNganHangCuaBan} là:`, nganHangCuaToi.name);
    }
    console.log('\n');
  },
  function (ma) {
    console.log("Chuyến B2 hỏng, con dấu:", ma);
  }
);

goiAPI(
  "https://provinces.open-api.vn/api/v1/p/",
  function (haiDo) {
    console.log("BẮT ĐẦU CHUYẾN B3");
    const xu = haiDo.find(x => x.name.includes("Hồ Chí Minh"));

    if (xu) {
      console.log(`Bắt đầu lấy dữ liệu quận/huyện cho: ${xu.name} (Mã: ${xu.code})`);

      goiAPI(
        `https://provinces.open-api.vn/api/v1/p/${xu.code}?depth=2`,
        function (ruongHai) {
          const danhSachHuyen = ruongHai.districts;
          console.log(`Danh sách quận/huyện của ${xu.name}`);
          const bangHuyen = danhSachHuyen.map(huyen => ({ "Tên": huyen.name, "Mã code": huyen.code }));
          console.table(bangHuyen);
          console.log('\n');
        },
        function (maLoi2) {
          console.log("Chuyến 2 của B3 hỏng, con dấu:", maLoi2);
        }
      );
    } else {
      console.log("Không tìm thấy xứ được yêu cầu.");
    }
  },
  function (maLoi1) {
    console.log("Chuyến 1 của B3 hỏng, con dấu:", maLoi1);
  }
);
