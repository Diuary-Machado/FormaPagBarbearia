import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormaPagamentoService } from '../../../services/formaPagamento/forma-pagamento.service';
import { FormaPagamento } from '../../../models/formaPagamento/forma-pagamento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forma-pagamentolist',
  standalone: true,
  imports: [],
  templateUrl: './forma-pagamentolist.component.html',
  styleUrl: './forma-pagamentolist.component.scss'
})
export class FormaPagamentolistComponent {

  modalService = inject(MdbModalService); 
  service = inject(FormaPagamentoService);

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: FormaPagamento[] = [];
  objEdit!: FormaPagamento;

  constructor() {
    this.listAll();
  }

  listAll(){
      this.service.listAll().subscribe({
        next: lista => {
          console.log('b');
          this.lista = lista;
        },
        error: erro => {
          debugger;
          alert('Erro ao carregar listagem de registros!');
        }
      });
  }



  deleteById(obj: FormaPagamento) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(obj.idFormaPagto!).subscribe({
          next: retorno => {
  
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.listAll();
          },
          error: erro => {
  
            alert(erro.status);
            console.log(erro);
           
            Swal.fire({
              title: 'ERRO!',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }


  new() {
    this.objEdit = new FormaPagamento(0,'Nome do Forma Pagamento');
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: FormaPagamento) {
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }




  retornoDetalhe(obj: FormaPagamento) {
    this.listAll();
    this.modalRef.close();
  } 


}
