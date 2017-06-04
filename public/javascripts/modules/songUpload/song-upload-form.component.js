/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('songUpload').
component('songUploadForm', {
    templateUrl: '/components/songUpload',
    controller: ['FileUploader' , function SongUploadController(FileUploader) {
        this.showUpload = true;
        this.uploadFormValid = true;
        this.showUploadOrURLMsg = false;
        this.emotionSelected = false;
        this.mood = [];
        this.song = [];
        this.currentMoods = [];
        this.moodString = "";

        var uploader = this.uploader = new FileUploader({
            url: 'upload.php',
            queueLimit:1
        });

        this.item = this.uploader.queue[0];

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

        this.EmoBarInput = function handleClick(item) {
            this.emotionSelected = true;
            var currentMood = item.attributes["name"].value;
            var index = this.currentMoods.indexOf(currentMood);
            if (index === -1) { // check whether the current mood is already in the currentMoods arrray
                this.currentMoods.push(currentMood); // if not value is pushed to array
                this.mood[currentMood] = true;
            }
            else if (this.currentMoods.length > 1) {
                this.mood[currentMood] = false;
                this.currentMoods.splice(index, 1);
            }
            if (this.currentMoods.length > 3) {
                var removeMood = this.currentMoods.shift();
                this.mood[removeMood] = false;
            }
            var currentMoodString = "";
            var currentMoodsCp = this.currentMoods.slice();
            currentMoodsCp.sort();
            currentMoodsCp.forEach(function (emotion) {
                currentMoodString += emotion.concat('0');
            })
            this.moodString = currentMoodString;
        }


        this.submitForm = function (isValid) {
            this.song["title"] = uploadForm.songTitle.value;
            this.song["artist"] = uploadForm.songArtist.value;
            this.song[this.moodString] = -1;
            // check to make sure the form is completely valid
            if (isValid) {
                console.log(uploadForm.songFile.data);
                //Song.addNewSong(this.song);
            }
            else{

            }

        }
    }]
});
