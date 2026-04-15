<?php

namespace App\Enums;

enum UserRole: string
{
    case MAHASISWA = 'mahasiswa';
    case DOSEN = 'dosen';
    case ADMIN = 'admin';

    public function label(): string
    {
        return match ($this) {
            self::MAHASISWA => 'Mahasiswa',
            self::DOSEN => 'Dosen',
            self::ADMIN => 'Administrator',
        };
    }

    public function dashboardRoute(): string
    {
        return match ($this) {
            self::MAHASISWA => 'mahasiswa.dashboard',
            self::DOSEN => 'dosen.dashboard',
            self::ADMIN => 'admin.dashboard',
        };
    }
}
