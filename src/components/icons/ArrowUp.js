import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgArrowUp(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
      {...props}>
      <Path d="M12 19V5M5 12l7-7 7 7" />
    </Svg>
  );
}

export default SvgArrowUp;
