export default function HardwareSection() {
  return (
    <div className="text-lg">
      <h2 className="mb-3 text-3xl">Hardware</h2>
      <ul className="list-disc list-inside [&_ul]:list-[revert]">
        <li>
          <strong>Gaming PC</strong>

          <ul className="list-disc list-inside pl-6">
            <li>
              <strong>CPU:</strong> i5-13000KF
            </li>
            <li>
              <strong>GPU:</strong> RTX 4060
            </li>
            <li>
              <strong>Motherboard:</strong> Gigabyte B760M
            </li>
            <li>
              <strong>Memory:</strong> DDR5 16GB 5600MHz
            </li>
            <li>
              <strong>Storage:</strong> 512GB NVMe SSD
            </li>
            <li>
              <strong>Power Supply:</strong> 750W 90 Plus Bronze
            </li>
            <li>
              <strong>Case:</strong> Darkflash DK 352
            </li>
          </ul>
        </li>

        <li>
          <strong>Monitor:</strong> Huawei MateView SE
        </li>
        <li>
          <strong>Keyboard:</strong> Fantech Super Maxfit AIR83 MK915
        </li>
        <li>
          <strong>Mouse:</strong> Fantech Raigor III WG12R
        </li>
        <li>
          <strong>Gamepad:</strong> Fantech Nova Wgp14
        </li>
      </ul>
    </div>
  );
}
