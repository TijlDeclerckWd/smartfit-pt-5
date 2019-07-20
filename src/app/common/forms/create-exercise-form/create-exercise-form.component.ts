import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExerciseService} from '../../../services/exercise.service';
import {matchYoutubeUrl} from '../../validators/matchYoutubeUrl.validator';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-create-exercise-form',
  templateUrl: './create-exercise-form.component.html',
  styleUrls: ['./create-exercise-form.component.scss']
})
export class CreateExerciseFormComponent implements OnInit, OnDestroy {

  createExerciseForm: FormGroup;
  filesToUpload = [];

  bulletPoints = [];
  bullet = '';

  ngUnsubscribe = new Subject();

  @ViewChild('bulletInput') bulletInput;

  get f() {
    return this.createExerciseForm;
  }

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.createForm();
  }

  addBulletPoint(e) {
    e.preventDefault()
    if (!!this.bullet) {
      this.bulletPoints.push(this.bullet);
      this.bulletInput.nativeElement.value = '';
      this.bulletInput.nativeElement.focus();
    }
  }

  createForm() {
    this.createExerciseForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'targetMuscles': new FormControl(null),
      'instructions': new FormControl(null),
      'videoLink': new FormControl(null, [matchYoutubeUrl])
    });
  }


  createExercise() {
    const value = this.createExerciseForm.value;

    const files: Array<File> = this.filesToUpload;
    if (this.createExerciseForm.valid) {
      const formData = new FormData();
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append('attachment', files[i], files[i]['name']);
        }
      }

      formData.append('name', value.name);
      formData.append('videoLink', `https://www.youtube.com/embed/${this.grabYoutubeId(value.videoLink)}`);
      formData.append('instructions', value.instructions);
      formData.append('targetMuscles', value.targetMuscles);
      formData.append('bulletPoints', JSON.stringify(this.bulletPoints));

      this.exerciseService.createNewExercise(formData)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          this.exerciseService.NewExerciseAdded.next(res['exercise']);
        });
    }
  }

  onFileChange(fileInput) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  grabYoutubeId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    // We see whether the entered URL is a valid Youtube URL
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
