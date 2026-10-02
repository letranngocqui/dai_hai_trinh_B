const thuyen = new XMLHttpRequest();
thuyen.open("GET", "https://api.vietqr.io/v2/banks");
thuyen.onreadystatechange = function () {
  if (thuyen.readyState === 4) {
    if (thuyen.status === 200) {
      const ruong = JSON.parse(thuyen.responseText);
      console.log("Toàn bộ rương lấy về:", ruong);
      const dataNganHang = ruong.data;

      console.log("1. Tổng số nhà băng hiện có là:", dataNganHang.length);
      const bangShortNameVaBin = dataNganHang.map(bank => {
        return {
          shortName: bank.shortName,
          bin: bank.bin
        };
      });

      console.log("2. Bảng shortName và bin của các nhà băng:");
      console.table(bangShortNameVaBin);

      const tenNganHangCuaBan = "VietinBank";
      const nganHangCuaToi = dataNganHang.find(bank => bank.shortName === tenNganHangCuaBan);
      if (nganHangCuaToi) {
        console.log(`3. Tên đầy đủ của ngân hàng ${tenNganHangCuaBan} là:`, nganHangCuaToi.name);
      } else {
        console.log(`3. Không tìm thấy ngân hàng có shortName là ${tenNganHangCuaBan}`);
      }
    } else {
      console.log("Chuyến hỏng, con dấu:", thuyen.status);
    }
  }
};
thuyen.send();
