import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { HorariolistComponent } from './components/horario/horariolist/horariolist.component';
import { HorariodetailsComponent } from './components/horario/horariodetails/horariodetails.component';
import { ClientedetailsComponent } from './components/cliente/clientedetails/clientedetails.component';
import { ClientelistComponent } from './components/cliente/clientelist/clientelist.component';
import { FormaPagamentolistComponent } from './components/formaPagamento/forma-pagamentolist/forma-pagamentolist.component';
import { FormaPagamentodetailsComponent } from './components/formaPagamento/forma-pagamentodetails/forma-pagamentodetails.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "admin", component: PrincipalComponent, children: [
        {path: "horarios", component: HorariolistComponent},
        {path: "horarios/new", component: HorariodetailsComponent},
        {path: "horarios/edit/:id", component: HorariodetailsComponent},
        {path: "clientes", component: ClientelistComponent},
        {path: "clientes/new", component: ClientedetailsComponent},
        {path: "formaPagamento", component: FormaPagamentolistComponent},
        {path: "formaPagamento/new", component: FormaPagamentodetailsComponent},
        {path: "formaPagamento/edit/:id", component: FormaPagamentodetailsComponent},
    ]}
];
