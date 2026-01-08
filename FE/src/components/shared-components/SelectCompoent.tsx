'use client'

import ParameterCode from "@/constants/ParameterCode";
import { duLieuDanhMucService } from "@/services/duLieuDanhMuc/duLieuDanhMuc.service";
import vehicleService from "@/services/vehicle/vehicle.service";
import { DropdownOption } from "@/types/general";
import { Select, SelectProps } from "antd"
import { useEffect, useState } from "react";

interface Props extends SelectProps {
    code: string;
}

const SelectComponet: React.FC<Props> = ({ code, ...props }) => {
    const [options, setOptions] = useState<DropdownOption[]>([])


    const fetchOptions = async () => {
        const fetchVehicles = async () => {
            const res = await vehicleService.getDropVehicle();
            if (res.status && res.data) {
                setOptions(res.data);
            }
        };
        const fetchProjectType = async () => {
            const res = await duLieuDanhMucService.GetDropdownCode("DANHMUCLOAICT");
            if (res.status && res.data) {
                setOptions(res.data);
            }
        };

        if (code === ParameterCode.BIENSOXE) {
            fetchVehicles();
        } else if (code === ParameterCode.LOAICONGTRINH) {
            fetchProjectType();
        }
    }

    useEffect(() => {
        fetchOptions()
    }, [code]);


    return (
        <Select
            {...props}
            options={options}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            showSearch
            allowClear
        />
    )
}


export default SelectComponet