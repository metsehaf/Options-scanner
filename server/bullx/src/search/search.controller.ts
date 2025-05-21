import { Controller, Get, InternalServerErrorException, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { SearchService } from "./search.service";
import { ConfigService } from "@nestjs/config";

@UseGuards(JwtAuthGuard)
@Controller('api')
export class SearchController {
    private apiKey: string | undefined;
    private epURL: string | undefined;

    constructor(private readonly searchService: SearchService, private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('Polygon_API_KEY');
        this.epURL = this.configService.get<string>('Polygon_API_URL');
    }

    @Get('search')
    async search(@Param('query') query: string) {
        try {
            return await this.searchService.search(query, this.apiKey, this.epURL);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch search results: ${error.message}`);
        }
    }
}