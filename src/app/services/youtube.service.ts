import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponce } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeURl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyBsNFvgQtERNuGcgImMuasolD6s-fxgTDI';
  private playlist = 'UUuGRoux8rs2u2dqOzm1v5SQ';
  private nextPageToken = '';

  constructor(private http: HttpClient) {
   }

   getVideos(){
     const url = `${this.youtubeURl}/playlistItems`;
     const params = new HttpParams()
     .set('part', 'snippet')
     .set('key', this.apiKey)
     .set('playlistId', this.playlist)
     .set('maxResults', '10')
     .set('pageToken',this.nextPageToken);
     return this.http.get<YoutubeResponce>(url, {params}).pipe(map(resp => {
       this.nextPageToken = resp.nextPageToken;
       return resp.items;
     }),
     map(items =>  items.map(video => video.snippet))
     );
   }
}
