/** @format */

import useMedia from "@ui-library/core/hooks/useMedia"

export enum Device {
	Smartphone,
	Tablet,
	Desktop,
}

const useDevice = () =>
	useMedia(
		["(max-width: 767px)", "(max-width: 1023px)"],
		[Device.Smartphone, Device.Tablet],
		Device.Desktop
	)

export default useDevice
