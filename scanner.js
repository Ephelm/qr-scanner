function handleScan(decodedText, decodedResult) {
  if (decodedText) {
    console.log("Scanned QR:", decodedText);

    fetch("https://www.vibezone.be/_functions/processCheckIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: decodedText }) // e.g. MEM0001
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Check-in processed!");
    })
    .catch(err => {
      alert("Fetch failed: " + err.message);
      console.error(err);
    });
  }
}

// Start the QR scanner
window.addEventListener("load", function () {
  let html5QrcodeScanner = new Html5QrcodeScanner(
    "preview",
    { fps: 10, qrbox: 250 }
  );
  html5QrcodeScanner.render(handleScan);
});
