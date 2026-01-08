"use client"

import { getLucideIconComponent } from "@/components/icon-components/icon-components";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import { commonService } from "@/services/common/common.service";
import { Modules } from "@/types/common/common";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const QLPage = () =>
{
    const [ lstModules, setLstModules ] = useState<Modules[]>( [] );
    const router = useRouter(); 
    const handleGetDanhSachModules = async () =>
    {
        const response = await commonService.GetAllListFile();
        if ( response.status )
        {
            setLstModules(response.data);
        }
    }
    const handleModuleClick = (module: Modules) => {
        router.push(`/object${module.link}`)
    }
    useEffect( () =>
    {
        handleGetDanhSachModules(); 
    }, [])

    return (
        <div >
            <div >

                <AutoBreadcrumb />

                {/* Header */}
                <div className="mb-8">
                    <h3 >
                        Chọn module để truy cập các chức năng của hệ thống
                    </h3>
                </div>

                {/* Module Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {lstModules.map((module: any) => {
                        const IconComponent = getLucideIconComponent(module.icon)
                        return (
                            <div
                                key={module.id}
                                onClick={() => handleModuleClick(module)}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 group"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-lg ${module.color} bg-teal-500 text-white`}>
                                            {  
                                                IconComponent &&
                                                <IconComponent size={24} />
                                            }
                                        </div>
                                        <ChevronRight 
                                            size={20} 
                                            className="text-gray-400 group-hover:text-gray-600 transition-colors"
                                        />
                                    </div>
                                    
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {module.name}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {module.description}
                                    </p>
                                    
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <span className="text-xs text-gray-500 font-medium">
                                            Click để truy cập →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default QLPage