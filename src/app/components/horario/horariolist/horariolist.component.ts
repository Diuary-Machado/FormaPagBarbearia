import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Horario } from '../../../models/horario/horario'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService, } from 'mdb-angular-ui-kit/modal';
import { HorariodetailsComponent } from '../horariodetails/horariodetails.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import Swal from 'sweetalert2';
import { HorarioService } from '../../../services/horario/horario.service';
import { Cliente } from '../../../models/cliente/cliente';
import { Funcionario } from '../../../models/funcionario/funcionario';

@Component({
  selector: 'app-horariolist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MdbModalModule,
    HorariodetailsComponent,
    MdbAccordionModule
  ],
  templateUrl: './horariolist.component.html',
  styleUrl: './horariolist.component.scss'
})
export class HorariolistComponent {
  modalService = inject(MdbModalService); 
  service = inject(HorarioService);

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 

  modalRef!: MdbModalRef<any>; 

  lista: Horario[] = [];
  objEdit!: Horario;

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

  deleteById(obj: Horario) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(obj.idHorario).subscribe({
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
    let cliente: Cliente = new Cliente(
      1,
      'Nome do Cliente',
      '123.456.789-00',
      'cliente@email.com',
      'senhaDoCliente'
    );
  
    let funcionario: Funcionario = new Funcionario(
      1, 
      'Nome do Funcionário',
      true, 
      '123.456.789-00', 
      'funcionario@email.com',
      'senhaDoFuncionario'
    );
    
    this.objEdit = new Horario(0, "", cliente, funcionario, 20.00);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: Horario) {
    this.objEdit = Object.assign({}, obj); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  retornoDetalhe(obj: Horario) {
    this.listAll();
    this.modalRef.close();
  }
}
