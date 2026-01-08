import { ApiResponse } from "@/types/general";
import { apiService } from "..";

class CrawlService
{
    public async crawl(): Promise<ApiResponse>
    {
        // Implement crawl logic here
        const res = await apiService.get(
            '/crawl',
        )
        return res;
    }
}


export const crawlService = new CrawlService();