// static hash for dev
window.tokenData = {"hash": "0x9ab614e6e5b0476efa1bb611b438169ae4abac1e5e7196fd58c59f5217c02b79",
                    "tokenID": "123000803"}

/*
function genTokenData(projectNum) {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
  return data;
}
let tokenData = genTokenData(123);
*/
