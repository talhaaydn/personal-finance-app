import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgChevronRight(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
      {...props}>
      <Path d="M9 18l6-6-6-6" />
    </Svg>
  );
}

export default SvgChevronRight;
