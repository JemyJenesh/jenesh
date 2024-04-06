export function DirectionIndicator({ direction }: { direction: 1 | -1 }) {
  const deg = direction === 1 ? 0 : 180;

  return (
    <svg
      fill="#26B99A"
      style={{
        width: "100%",
        height: "100%",
        transform: `rotateY(${deg}deg)`,
      }}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="110px"
      height="110px"
      viewBox="0 0 396.593 396.594"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <g>
            <path d="M232.114,45.272c-25.092-20.196-55.692-30.6-84.456-44.676c-4.896-1.836-11.016,0.612-11.016,6.732 c0,7.956,0,15.912,1.836,23.256C-21.254,2.432-48.182,356.168,137.254,372.08c6.732,0.611,6.732-8.568,1.224-10.404 c-39.78-14.076-70.38-31.211-92.412-68.543c-19.584-34.273-25.704-75.277-23.256-114.445 c4.284-72.828,46.512-135.864,119.952-134.64c0.612,1.224,1.224,3.06,2.448,4.284c-6.732,3.672-12.852,8.568-18.972,13.464 c-4.284,3.672-1.836,10.404,3.06,11.628c34.884,9.792,70.379-2.448,101.592-17.136C234.562,55.064,235.786,48.332,232.114,45.272z M145.822,63.02c5.508-4.284,11.017-7.956,17.136-11.628c4.284-2.448,2.448-7.956-1.224-8.568c0.612-2.448,0-5.508-3.06-6.732 c-1.836-0.612-3.061-1.224-4.896-1.224c-1.224-4.896-1.836-10.404-1.836-15.912c20.808,9.18,42.84,17.136,61.812,30.6 C192.333,58.736,169.078,65.468,145.822,63.02z"></path>
            <path d="M371.65,96.68c-14.688-32.436-53.244-66.096-91.188-62.424c-6.731,0.612-8.567,9.792-1.836,12.24 c36.108,12.24,61.812,20.808,80.172,57.528c17.137,34.272,17.748,76.5,11.628,113.832 c-9.18,60.588-49.571,145.045-120.563,135.865c7.956-11.629,14.076-24.48,17.136-38.557c1.836-6.119-4.896-10.404-10.404-7.955 c-31.823,14.076-61.199,31.822-88.128,53.855c-4.283,3.672-1.835,10.404,3.061,12.24c29.987,9.791,59.976,19.584,91.8,23.256 c6.12,0.611,8.568-7.344,4.896-11.629c-4.896-4.895-9.793-12.852-15.301-19.584c75.889,11.016,119.952-79.559,131.58-144.432 C391.845,179.912,389.398,135.236,371.65,96.68z M233.337,353.107C233.337,353.107,233.337,353.721,233.337,353.107 c-1.224,1.225-1.836,2.449-2.447,3.061c-3.673,4.896,0.611,9.793,5.508,9.793c2.447,4.283,5.508,9.18,9.18,13.463 c-18.972-4.283-37.944-9.791-56.916-15.912c18.36-14.688,38.556-26.316,59.977-36.719 C244.354,335.973,239.458,344.541,233.337,353.107z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
