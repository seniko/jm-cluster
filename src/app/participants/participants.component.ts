import { Component, OnInit, OnDestroy } from '@angular/core';
import { PartnersService } from '../services/partners.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit, OnDestroy {
  partners: any[];
  partner: any;

  state: boolean;
  parsedFormSubs: Subscription;
  
  constructor(public partnerService: PartnersService,
    public _flashMessagesService: FlashMessagesService,
    public authService: AuthService,
    private dataService: DataService,
    private modalService: ModalService) {

      this.parsedFormSubs = this.modalService.onPost.subscribe(parsedForm => {
        this.partnerService.postPartner(parsedForm).subscribe(partner => {
          if (partner) {
            //this.partners.push(partner);
            this.partners.unshift(partner);
            this._flashMessagesService.show("Added.", {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
          }
        }, err => {
            this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
        });
      });

      this.modalService.onUpdate.subscribe(data => {
        if (data.modeName !== "Update partner") return;
        this.partnerService.updatePartner(data._id, data.parsedForm).subscribe(partner => {
          if (partner) {
            const index = this.partners.indexOf(this.partner);
            this.partners.splice(index, 1, partner);
            this._flashMessagesService.show("Updated.", {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
          }
        }, err => {
          this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
        });
      });

     }



  ngOnInit() {
    this.partnerService.getPartners().subscribe(list => {
      this.partners = list;
    }, err => {
      console.log(err);
      return false;
    });

    this.dataService.currentState.subscribe(state => {
      this.state = state;
    });
  }

  ngOnDestroy() {
    if(this.parsedFormSubs) {
      this.parsedFormSubs.unsubscribe();
    }
  }

  onDelete(partner) {
    const confirmMessage = confirm("Do you want to delete this partner?");

    if (confirmMessage) {
      this.partnerService.deletePartner(partner._id).subscribe(data => {
        if (data.success) {
          const index = this.partners.indexOf(partner);
          this.partners.splice(index, 1);
          this._flashMessagesService.show(data.msg, {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
        }
      }, err => {
        console.log(err);
        return false;
      });
    }
  }

  onEdit(partner) {
    this.partner = partner;
    this.modalService.onEdit.emit({editMode: true, modeName: "Update partner", item: partner});
  }

  onAdd() {
    this.modalService.onAdd.emit({addMode: true, modeName: "Add Partner"});
  }

  newState() {
    this.dataService.changeState(false);
  }  


}
