import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface DiceRollResult {
   characterName: string;
   diceName: string;
   individualResults?: number[];
   finalResult: number;
   operation?: string;
}

@Injectable({
   providedIn: 'root'
})
export class DiscordService {

   public ligado = false;
   private webhookUrl = '';

   constructor(private http: HttpClient) { }

   public setWebhookUrl(url: string) {
      this.webhookUrl = url;
   }

   /**
    * Sends a dice roll result to Discord webhook
    *
    * @param rollResult - Object containing dice roll information
    * @returns Observable that completes silently on success or error
    */
   public sendDiceRoll(rollResult: DiceRollResult) {
      const webhookUrl = this.webhookUrl;

      // Check if webhook is configured
      if (!webhookUrl || webhookUrl.trim() === '') {
         console.warn('Discord webhook URL not configured');
         return of(null);
      }

      const embed = this.createEmbed(rollResult);
      const payload = { embeds: [embed] };

      return this.http.post(webhookUrl, payload).pipe(
         catchError((error) => {
            console.error('Failed to send dice roll to Discord:', error);
            return of(null);
         })
      );
   }

   private createEmbed(rollResult: DiceRollResult) {
      const { characterName, diceName, individualResults, finalResult, operation } = rollResult;

      // Generate color based on result (green for high, red for low, blue for medium)
      const color = this.getColorForResult(finalResult);

      const fields: any[] = [
         {
            name: `🎲 ${diceName}`, //'🎲 Dado',
            value: '', // diceName,
            inline: true
         },
         {
            name: `👤 ${characterName || 'Desconhecido'}`, //'👤 Personagem',
            value: '',// characterName || 'Desconhecido',
            inline: true
         }
      ];

      // Add operation if specified
      if (operation) {
         fields.push({
            name: '🔢 Operação',
            value: operation,
            inline: true
         });
      }

      if (finalResult !== null && finalResult !== undefined) {
         // Add final result
         fields.push({
            name: `✨ [ ${finalResult} ]`, //'✨ Resultado Final',
            value: '', //`**${finalResult}**`,
            inline: true
         });
      }

      // Add individual results if available (for multiple rolls)
      if (individualResults && individualResults.length > 1) {
         fields.push({
            name: `📊 Rolagens: ${individualResults.join(', ')}`, //'📊 Rolagens',
            value: '', //individualResults.join(', '),
            inline: false
         });
      }

      return {
         title: '🎲 Rolagem de Dados',
         color,
         fields,
         timestamp: new Date().toISOString(),
         footer: {
            text: 'RPG Sheet App'
         }
      };
   }

   private getColorForResult(result: number): number {
      // Discord colors in decimal format
      if (result >= 15) {
         return 0x43B581; // Green - high roll
      } else if (result <= 5) {
         return 0xF04747; // Red - low roll
      } else {
         return 0x7289DA; // Blurple - medium roll
      }
   }
}
