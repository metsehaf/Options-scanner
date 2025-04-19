import { Controller, Get, Req, Res } from "@nestjs/common";
import { EnvironmentService } from "./enviornment.service";

@Controller('api')
export class EnvironmentController {
  constructor(private envService: EnvironmentService ) {}

  @Get("envs")
  getEnvironments(@Req() request: Request, @Res() response: Response) {
    this.envService.getEnvironments(request, response)
  }
}