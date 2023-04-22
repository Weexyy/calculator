import { useState } from "react";

import InputBar from "@/components/InputBar";

import type { Dispatch, SetStateAction } from "react";

function Byte() {
	const [byte, setByte] = useState("");
	const [kilobyte, setKilobyte] = useState("");
	const [megabyte, setMegabyte] = useState("");
	const [gigabyte, setGigabyte] = useState("");
	const [terabyte, setTerabyte] = useState("");

	const setters = [
		[setByte, 1],
		[setKilobyte, 1024],
		[setMegabyte, 1024 * 1024],
		[setGigabyte, 1024 * 1024 * 1024],
		[setTerabyte, 1024 * 1024 * 1024 * 1024]
	] as [Dispatch<SetStateAction<string>>, number][];

	const calculate = (newByte: number, setterIndex: number) => {
		if (isNaN(newByte)) {
			return;
		}
		setters.forEach(([setter, multiplier], index) => {
			if (index === setterIndex) {
				return;
			}
			setter((newByte / multiplier).toString());
		});
	};

	const clear = () => {
		setByte("");
		setKilobyte("");
		setMegabyte("");
		setGigabyte("");
		setTerabyte("");
	};

	const handleChange = (newValue: string, setterIndex: number) => {
		if (!newValue) {
			clear();
			return;
		}
		const number = Number(newValue);
		if (isNaN(number)) {
			return;
		}
		const multiplier = setters[setterIndex][1];
		calculate(number * multiplier, setterIndex);
	};

	const handleByteChange = (newValue: string) => {
		handleChange(newValue, 0);
		setByte(newValue);
	};

	const handleKilobyteChange = (newValue: string) => {
		handleChange(newValue, 1);
		setKilobyte(newValue);
	};

	const handleMegabyteChange = (newValue: string) => {
		handleChange(newValue, 2);
		setMegabyte(newValue);
	};

	const handleGigabyteChange = (newValue: string) => {
		handleChange(newValue, 3);
		setGigabyte(newValue);
	};

	const handleTerabyteChange = (newValue: string) => {
		handleChange(newValue, 4);
		setTerabyte(newValue);
	};

	const inputBarItems = [{
		label: "byte",
		value: byte,
		setValue: handleByteChange
	}, {
		label: "kilobyte",
		value: kilobyte,
		setValue: handleKilobyteChange
	}, {
		label: "megabyte",
		value: megabyte,
		setValue: handleMegabyteChange
	}, {
		label: "gigabyte",
		value: gigabyte,
		setValue: handleGigabyteChange
	}, {
		label: "terabyte",
		value: terabyte,
		setValue: handleTerabyteChange
	}] as const;

	const inputBarElements = inputBarItems.map((item) => {
		return (
			<InputBar
				hasError={isNaN(Number(item.value))}
				id={item.label + "-input"}
				key={item.label}
				label={item.label}
				placeholder={"enterNumber"}
				value={item.value}
				setValue={item.setValue}
			/>
		);
	});

	return (
		<main>{inputBarElements}</main>
	);
}

export default Byte;
