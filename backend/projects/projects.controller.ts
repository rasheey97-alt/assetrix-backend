// backend/projects/projects.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAllProjects() {
    return this.projectsService.findAllPublic();
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('developer')
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto, @Req() req: any) {
    return this.projectsService.create(createProjectDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('developer')
  @Get('/dev/projects')
  getDeveloperProjects(@Req() req: any) {
    return this.projectsService.findByDeveloper(req.user.id);
  }
}
