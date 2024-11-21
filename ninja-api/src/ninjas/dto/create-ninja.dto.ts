import { MinLength, IsEnum } from "class-validator";

export class CreateNinjaDto {
  @MinLength(3)
  name: string;
  @IsEnum(['gun', 'sord'], {message:"Use Correct Weapon"})
  weapon: 'gun' | 'sord';
}
